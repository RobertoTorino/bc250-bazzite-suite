#!/usr/bin/env bash
# bc250-persistent-acpi — persistent ACPI fix installer for the AMD BC-250.
#
# Installs the SSDT overrides from e-tho/bc250-acpi-fix as a GRUB early
# initrd. Survives kernel and rpm-ostree/image updates: the blscfg GRUB
# module prepends GRUB_EARLY_INITRD_LINUX_CUSTOM to every BLS boot entry,
# including kernels installed later.
#
# Usage: sudo ./install.sh
set -euo pipefail

CPIO_SRC="$(cd "$(dirname "$0")" && pwd)/tables/acpi_override.cpio"
CPIO_DST="/boot/acpi_override.cpio"
GRUB_DEFAULT="/etc/default/grub"
GRUB_LINE='GRUB_EARLY_INITRD_LINUX_CUSTOM="../../acpi_override.cpio"'

info()  { printf '\033[1;34m[INFO]\033[0m %s\n' "$*"; }
warn()  { printf '\033[1;33m[WARN]\033[0m %s\n' "$*"; }
error() { printf '\033[1;31m[ERROR]\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || error "Run as root: sudo $0"
[ -f "$CPIO_SRC" ] || error "tables/acpi_override.cpio not found next to this script."

# Sanity: BC-250 uses the 'cyan skillfish' GPU (1002:13fe).
if command -v lspci >/dev/null 2>&1 && ! lspci -nd 1002:13fe | grep -q .; then
    warn "No BC-250 GPU (1002:13fe) detected. This fix is only meant for the AMD BC-250."
    read -rp "Continue anyway? [y/N] " a; [[ ${a,,} == y ]] || exit 1
fi

# Modded BIOSes may ship their own ACPI fixes; duplicate tables fail to load.
bios_ver=$(cat /sys/class/dmi/id/bios_version 2>/dev/null || true)
if printf '%s' "$bios_ver" | grep -qiE 'mei|dxe|mod|unlock'; then
    warn "BIOS version '$bios_ver' looks modded. If it already injects ACPI fixes, do NOT install this override."
    read -rp "Continue anyway? [y/N] " a; [[ ${a,,} == y ]] || exit 1
fi

# Kernel must support the ACPI table upgrade mechanism.
for cfg in "/boot/config-$(uname -r)" "/usr/lib/modules/$(uname -r)/config"; do
    if [ -r "$cfg" ]; then
        grep -q '^CONFIG_ACPI_TABLE_UPGRADE=y' "$cfg" \
            || error "Kernel lacks CONFIG_ACPI_TABLE_UPGRADE; the override cannot load."
        break
    fi
done

# Already loaded from a previous install or another method?
if journalctl -b -k --no-pager -q 2>/dev/null | grep -qiE 'ACPI: Table Upgrade'; then
    info "An ACPI table override is already active this boot; reinstalling the files anyway."
fi

install -m 0644 "$CPIO_SRC" "$CPIO_DST"
info "Installed $CPIO_DST"

if grep -q '^GRUB_EARLY_INITRD_LINUX_CUSTOM=' "$GRUB_DEFAULT" 2>/dev/null; then
    sed -i "s|^GRUB_EARLY_INITRD_LINUX_CUSTOM=.*|$GRUB_LINE|" "$GRUB_DEFAULT"
    info "Updated existing GRUB_EARLY_INITRD_LINUX_CUSTOM in $GRUB_DEFAULT"
else
    printf '%s\n' "$GRUB_LINE" >> "$GRUB_DEFAULT"
    info "Appended early-initrd line to $GRUB_DEFAULT"
fi

# Regenerate the GRUB config.
if command -v ujust >/dev/null 2>&1; then
    info "Regenerating GRUB config (ujust regenerate-grub)..."
    ujust regenerate-grub
elif command -v grub2-mkconfig >/dev/null 2>&1; then
    info "Regenerating GRUB config (grub2-mkconfig)..."
    grub2-mkconfig -o /boot/grub2/grub.cfg
else
    error "Neither ujust nor grub2-mkconfig found; regenerate your GRUB config manually."
fi

info "Done. Reboot, then verify with:"
info "  sudo dmesg | grep -iE 'ACPI.*(SSDT|Table Upgrade)'"
info "  cpupower frequency-info   # 8 steps, 800 MHz - 3.2 GHz"
info "  cpupower idle-info        # POLL, C1, C2"

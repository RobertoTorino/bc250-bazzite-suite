#!/usr/bin/env bash
# bc250-persistent-acpi — fully reverses install.sh.
# Usage: sudo ./uninstall.sh
set -euo pipefail

info()  { printf '\033[1;34m[INFO]\033[0m %s\n' "$*"; }
error() { printf '\033[1;31m[ERROR]\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || error "Run as root: sudo $0"

rm -f /boot/acpi_override.cpio
info "Removed /boot/acpi_override.cpio"

sed -i '/^GRUB_EARLY_INITRD_LINUX_CUSTOM=/d' /etc/default/grub
info "Removed early-initrd line from /etc/default/grub"

if command -v ujust >/dev/null 2>&1; then
    ujust regenerate-grub
elif command -v grub2-mkconfig >/dev/null 2>&1; then
    grub2-mkconfig -o /boot/grub2/grub.cfg
else
    error "Neither ujust nor grub2-mkconfig found; regenerate your GRUB config manually."
fi

info "Done. Reboot to return to the BIOS-provided ACPI tables."

export function submitBtn(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving...",
) {
  btn.textContent = isLoading ? loadingText : defaultText;
}

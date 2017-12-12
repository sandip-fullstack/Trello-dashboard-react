export function generateAlert(status = "false", text, theme) {
    const alertBody = {
      showAlertStatus: status,
      alertTheme: theme,
      alertText: text
    };
    return alertBody;
  }

function analyzeLogLine(line) {
    if (/('|").*(=|OR).*('|")/i.test(line) || /DROP TABLE|SELECT \*/i.test(line)) {
      return { matched: true, type: "sql_injection", details: line };
    }

    if (/login failed|unauthorized|auth(entication)? error/i.test(line)) {
      return { matched: true, type: "login_failure", details: line };
    }

    if (/\/(admin|etc\/passwd|root)/i.test(line)) {
      return { matched: true, type: "suspicious_path", details: line };
    }

    return null;
  }

  module.exports = analyzeLogLine;

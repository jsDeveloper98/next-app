import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
} from "../constants/regex";

class RuleService {
  private static rulesMap = {
    username: RuleService.getUsernameRules,
    email: RuleService.getEmailRules,
    password: RuleService.getPasswordRules,
    repeatPassword: RuleService.getRepeatPasswordRules,
  } as const;

  static getRules(key: keyof typeof RuleService.rulesMap) {
    return RuleService.rulesMap[key as keyof typeof RuleService.rulesMap]();
  }

  private static getUsernameRules() {
    return {
      required: true,
      minLength: {
        value: 5,
        message: `Username must be at least 5 characters long.`,
      },
      pattern: {
        value: USERNAME_REGEX,
        message:
          "Username can only use letters, numbers, underscores, and periods.",
      },
    };
  }

  private static getEmailRules() {
    return {
      required: true,
      pattern: {
        value: EMAIL_REGEX,
        message: "Email is not valid",
      },
    };
  }

  private static getPasswordRules() {
    return {
      required: true,
      pattern: {
        value: PASSWORD_REGEX,
        message:
          "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:",
      },
    };
  }

  private static getRepeatPasswordRules() {
    return { match: "password" };
  }
}

export default RuleService;

export type Locale = "en" | "es";

export interface SettingsTranslations {
  sidebar: {
    title: string;
    navigation: {
      profile: string;
      account: string;
      notifications: string;
      security: string;
      billing: string;
      integrations: string;
      preferences: string;
    };
  };
  profile: {
    title: string;
    description: string;
    form: {
      avatar: {
        label: string;
        description: string;
        button: string;
      };
      name: {
        label: string;
        placeholder: string;
      };
      bio: {
        label: string;
        placeholder: string;
        description: string;
      };
      location: {
        label: string;
        placeholder: string;
      };
      website: {
        label: string;
        placeholder: string;
      };
      submit: string;
    };
  };
  account: {
    title: string;
    description: string;
    form: {
      email: {
        label: string;
        description: string;
        button: string;
      };
      language: {
        label: string;
        description: string;
      };
      timezone: {
        label: string;
        description: string;
      };
      submit: string;
    };
  };
  notifications: {
    title: string;
    description: string;
    form: {
      email: {
        label: string;
        description: string;
      };
      push: {
        label: string;
        description: string;
      };
      marketing: {
        label: string;
        description: string;
      };
      submit: string;
    };
  };
  security: {
    title: string;
    description: string;
    form: {
      password: {
        label: string;
        description: string;
        button: string;
      };
      twoFactor: {
        label: string;
        description: string;
        button: string;
      };
      sessions: {
        label: string;
        description: string;
        button: string;
      };
      submit: string;
    };
  };
  billing: {
    title: string;
    description: string;
    form: {
      plan: {
        label: string;
        description: string;
      };
      payment: {
        label: string;
        description: string;
        button: string;
      };
      invoices: {
        label: string;
        description: string;
        button: string;
      };
      submit: string;
    };
  };
  integrations: {
    title: string;
    description: string;
    form: {
      github: {
        label: string;
        description: string;
      };
      google: {
        label: string;
        description: string;
      };
      submit: string;
    };
  };
  preferences: {
    title: string;
    description: string;
    form: {
      theme: {
        label: string;
        description: string;
        options: {
          light: string;
          dark: string;
          system: string;
        };
      };
      layout: {
        label: string;
        description: string;
      };
      submit: string;
    };
  };
}

export interface CommonTranslations {
  welcome: string;
  login: string;
  signup: string;
  logout: string;
  email: string;
  password: string;
  submit: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;
  search: string;
  loading: string;
  error: string;
  success: string;
  language: string;
  latestUpdates: string;
  blogPosts: string;
  blogDescription: string;
  viewAllArticles: string;
}

export interface NavigationTranslations {
  home: string;
  dashboard: string;
  profile: string;
  settings: string;
}

export interface AuthTranslations {
  loginTitle: string;
  signupTitle: string;
  forgotPassword: string;
  rememberMe: string;
  noAccount: string;
  hasAccount: string;
}

export interface Messages {
  common: CommonTranslations;
  navigation: NavigationTranslations;
  auth: AuthTranslations;
  settings: SettingsTranslations;
}

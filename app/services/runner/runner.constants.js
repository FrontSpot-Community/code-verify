export const languages = {
  JAVASCRIPT: 'javascript',
  PHP: 'php',
  JAVA: 'java',
  CSHARP: 'csharp',
  PYTHON: 'python'
};

export const runners = {
  [languages.JAVASCRIPT]: 'NODE',
  [languages.PHP]: 'PHP',
  [languages.JAVA]: 'JAVA',
  [languages.CSHARP]: 'CSHARP',
  [languages.PYTHON]: 'PYTHON'
};

export const testFrameworks = {
  [languages.JAVASCRIPT]: 'cw-2',
  [languages.PHP]: 'phpunit',
  [languages.JAVA]: 'junit',
  [languages.CSHARP]: 'nunit',
  [languages.PYTHON]: 'cw-2'
};

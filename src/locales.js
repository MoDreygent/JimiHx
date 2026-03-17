export const strings = {
  en: {
    // Onboarding — Welcome
    welcome_title: 'JimiHx',
    welcome_subtitle: 'Behavioral Screening for Children',
    welcome_cta: 'Continue',

    // Onboarding — Disclaimer
    disclaimer_title: 'Parent Information',
    disclaimer_items: [
      'This is a behavioral screening for children ages 7–12.',
      'This is NOT a diagnosis. Results suggest areas for professional consultation.',
      'The screening takes approximately 10 minutes.',
      'Your child needs a quiet space with no interruptions.',
      'This screening cannot be paused or restarted. One attempt per purchase.',
      'Please ensure your child is comfortable and ready before starting.',
    ],
    disclaimer_checkbox: 'I understand and agree',
    disclaimer_cta: 'Start',

    // Onboarding — Age Input
    age_title: "Child's Age",
    age_label: 'How old is your child?',
    age_placeholder: 'Enter age (7–12)',
    age_error: 'This screening is designed for children ages 7–12.',
    age_cta: 'Start',

    // Scene 1
    pick_hero: 'Pick your hero!',

    // Victory reactions
    alien_reaction: 'I knew it!!',
    girl_pow: 'POW!',
  },

  pt: {
    // Onboarding — Welcome
    welcome_title: 'JimiHx',
    welcome_subtitle: 'Triagem Comportamental para Crianças',
    welcome_cta: 'Continuar',

    // Onboarding — Disclaimer
    disclaimer_title: 'Informação para Pais',
    disclaimer_items: [
      'Esta é uma triagem comportamental para crianças de 7 a 12 anos.',
      'Isso NÃO é um diagnóstico. Os resultados sugerem áreas para consulta profissional.',
      'A triagem leva aproximadamente 10 minutos.',
      'Seu filho precisa de um espaço tranquilo sem interrupções.',
      'Esta triagem não pode ser pausada ou reiniciada. Uma tentativa por compra.',
      'Por favor, certifique-se de que seu filho está confortável e pronto para começar.',
    ],
    disclaimer_checkbox: 'Eu entendo e concordo',
    disclaimer_cta: 'Iniciar',

    // Onboarding — Age Input
    age_title: 'Idade da Criança',
    age_label: 'Quantos anos tem seu filho?',
    age_placeholder: 'Digite a idade (7–12)',
    age_error: 'Esta triagem é destinada a crianças de 7 a 12 anos.',
    age_cta: 'Iniciar',

    // Scene 1
    pick_hero: 'Escolha o seu herói!',

    // Victory reactions
    alien_reaction: 'Eu sabia!!',
    girl_pow: 'GOL!',
  },
};

export function t(lang, key) {
  return strings[lang]?.[key] ?? strings.en[key] ?? key;
}

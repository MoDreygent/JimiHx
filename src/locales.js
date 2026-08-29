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

    // Post-game projective question
    postgame_question: "Jimi's heading back to his planet… what happens next?",

    // JH.0 — Gate
    gate_age: 'Your age',
    gate_email: 'Your email',
    gate_ready: 'READY TO LAND',
    gate_landing: 'LANDING',

    // JH.5 — Which one fits you best?
    q_fits_you_best: 'Which one fits you best?',
    opt_under_tree:  'Under the tree',
    opt_soccer:      'Playing soccer',
    opt_bike_kick:   'Kicking the bike into the puddle',
    opt_guitar_kids: 'With the guitar kids',
    opt_home_sleep:  'Home, sleeping',
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

    // Post-game projective question
    postgame_question: 'Jimi está voltando para o planeta dele… o que acontece?',

    // JH.0 — Gate
    gate_age: 'Sua idade',
    gate_email: 'Seu email',
    gate_ready: 'PRONTO PRA POUSAR',
    gate_landing: 'POUSANDO',

    // JH.5 — Which one fits you best?
    q_fits_you_best: 'Qual combina mais com você?',
    opt_under_tree:  'Embaixo da árvore',
    opt_soccer:      'Jogando futebol',
    opt_bike_kick:   'Chutando a bike na poça',
    opt_guitar_kids: 'Com a galera do violão',
    opt_home_sleep:  'Em casa, dormindo',
  },
};

export function t(lang, key) {
  return strings[lang]?.[key] ?? strings.en[key] ?? key;
}

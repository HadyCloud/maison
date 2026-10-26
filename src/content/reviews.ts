export type Review = { id: string; author: string; rating: 4 | 5; text: string };

/**
 * Real Google reviews (checked on the Google listing, 4.8/5 · 840 reviews). Texts are kept in their original
 * language: only punctuation and accents are tidied, and nothing is cut except at a sentence end; authors are shown as first name + initial.
 */
export const reviews: Review[] = [
  {
    id: "coraline",
    author: "Coraline B.",
    rating: 5,
    text: "Difficile de ne pas mettre 5 étoiles\u00a0! Nous avons été accueillies par une équipe adorable, aux petits soins.",
  },
  {
    id: "laura-l",
    author: "Laura L.",
    rating: 5,
    text: "Meilleur libanais que j'ai pu tester. L'accueil est sympa, la nourriture est top. Tout était super, on s'est régalés et nous reviendrons, c'est certain.",
  },
  {
    id: "tracy",
    author: "Tracy S.",
    rating: 5,
    text: "Je suis Libanaise et je vous confirme que c'est de la grosse qualité, que ça soit le service, l'atmosphère ou la bouffe (hommous viande et shawarma exceptionnels). Je vous le conseille vivement.",
  },
  {
    id: "riyad",
    author: "Riyad Z.",
    rating: 5,
    text: "Foie de volaille de très bonne qualité, relevé par une touche de grenade qui apporte une belle fraîcheur à l'ensemble. Un plat très réussi.",
  },
  {
    id: "noah",
    author: "Noah R.",
    rating: 5,
    text: "Excellente cuisine aux saveurs riches et variées, un très bon déjeuner entre ami·e·s avec mezzés à partager. Très savoureux\u00a0! Merci à l'équipe\u00a0!",
  },
  {
    id: "nour",
    author: "Nour A.",
    rating: 5,
    text: "Top tier Lebanese food. If you want something as authentic as the food in Lebanon, this is the place.",
  },
  {
    id: "gabriel",
    author: "Gabriel A.",
    rating: 5,
    text: "Première expérience à Maison L, délicieux\u00a0! Très bon accueil, un repas authentique et frais accompagné d'un très bon vin libanais. Je reviendrais\u00a0!",
  },
  {
    id: "anne-l",
    author: "Anne L.",
    rating: 5,
    text: "Très bonne cuisine, savoureuse et généreuse. Service agréable et compétent. Belle découverte. On recommande\u00a0!",
  },
  {
    id: "sophie",
    author: "Sophie M.",
    rating: 5,
    text: "Ambiance agréable, serveurs disponibles et à l'écoute… une cuisine fraîche et délicieuse, des saveurs exceptionnelles et bien servies\u00a0! Bravo.",
  },
  {
    id: "lea",
    author: "Léa F.",
    rating: 5,
    text: "Une envie de manger un très bon mezze sur Lille\u00a0? Je pense pouvoir recommander Maison L les yeux fermés.",
  },
  {
    id: "anne-d",
    author: "Anne D.",
    rating: 4,
    text: "Très bon restaurant avec beau décor. Les produits sont très frais.",
  },
  {
    id: "anthony",
    author: "Anthony M.",
    rating: 5,
    text: "Une explosion de saveurs\u00a0! Très bon, restaurant très chaleureux. Je conseille vivement.",
  },
];

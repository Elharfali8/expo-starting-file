type NavLinksProps = {
  id: number;
  title: string;
  description: string;
  path: string;
  icon: string;
};

export const navLinks: NavLinksProps[] = [
  {
    id: 1,
    title: "Accueil",
    description: "Vue d'ensemble",
    path: "/",
    icon: "home",
  },
  {
    id: 2,
    title: "Digital Profile",
    description: "Votre profil en ligne",
    path: "/digital-profile",
    icon: "user",
  },
];

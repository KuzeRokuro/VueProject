import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import PlayersPage from "../components/PlayersPage.vue";
import TournamentsPage from "../components/TournamentsPage.vue";
import AddPlayer from "@/components/AddPlayer.vue";
import AddTournament from "@/components/AddTournament.vue";
import EditTournament from "@/components/EditTournament.vue";
import EditPlayer from "@/components/EditPlayer.vue";
import StartTournament from "@/components/StartTournament.vue";
import RankTournament from "@/components/RankTournament.vue";
import ViewMatch from "@/components/ViewMatch.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/players",
    name: "Players",
    component: PlayersPage, // Replace with your actual Players page component
  },
  {
    path: "/addplayer",
    name: "AddPlayer",
    component: AddPlayer,
  },
  {
    path: '/edit-player/:id',
    name: 'EditPlayer',
    component: EditPlayer,
  },
  {
    path: "/tournaments",
    name: "Tournaments",
    component: TournamentsPage, // Replace with your actual Tournaments page component
  },
  {
    path: "/addtournament",
    name: "AddTournament",
    component: AddTournament,
  },
  {
    path: '/edit-tournament/:id',
    name: 'EditTournament',
    component: EditTournament,
  },
  {
    path: '/start-tournament/:id',
    name: 'StartTournament',
    component: StartTournament,
  },
  {
    path: '/rank-tournament/:id',
    name: 'RankTournament',
    component: RankTournament,
    props:true,
  },
  {
    path: '/view-match/:id',
    name: 'ViewMatch',
    component: ViewMatch,
    meta: { hideNavbar: true },
    props:true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

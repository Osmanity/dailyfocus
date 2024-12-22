import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState({
    Hälsa: [
      {
        title: "Träna yoga",
        status: "Ej Utförd",
        beskrivning: "Gör en 30-minuters yogasession.",
        tidsestimat: "0.5",
        deadline: "2024-12-31",
      },
      {
        title: "Gå till läkaren",
        status: "Utförd",
        beskrivning: "Årlig hälsokontroll.",
        tidsestimat: "1",
        deadline: "2024-12-15",
      },
      {
        title: "Ta en promenad",
        status: "Ej Utförd",
        beskrivning: "Gå 5 km i parken.",
        tidsestimat: "1",
        deadline: "2024-12-25",
      },
      {
        title: "Meditera",
        status: "Utförd",
        beskrivning: "10-minuters mindfulness-session.",
        tidsestimat: "0.2",
        deadline: "2024-12-20",
      },
    ],
    Hushåll: [
      {
        title: "Städa köket",
        status: "Ej Utförd",
        beskrivning: "Disk och rengör alla ytor.",
        tidsestimat: "0.75",
        deadline: "2024-12-22",
      },
      {
        title: "Handla mat",
        status: "Utförd",
        beskrivning: "Köp ingredienser för veckan.",
        tidsestimat: "1",
        deadline: "2024-12-20",
      },
      {
        title: "Tvätta kläder",
        status: "Ej Utförd",
        beskrivning: "Tvätta och vik tvätt.",
        tidsestimat: "2",
        deadline: "2024-12-23",
      },
      {
        title: "Rensa garderoben",
        status: "Utförd",
        beskrivning: "Sortera kläder och donera det som inte används.",
        tidsestimat: "3",
        deadline: "2024-12-18",
      },
    ],
    Jobb: [
      {
        title: "Skicka rapport",
        status: "Ej Utförd",
        beskrivning: "Slutför och skicka Q4-rapporten.",
        tidsestimat: "2",
        deadline: "2024-12-23",
      },
      {
        title: "Delta i teammöte",
        status: "Utförd",
        beskrivning: "Veckomöte med teamet.",
        tidsestimat: "1",
        deadline: "2024-12-19",
      },
      {
        title: "Följ upp med klient",
        status: "Ej Utförd",
        beskrivning: "Skicka uppföljningsmail till klienten.",
        tidsestimat: "0.5",
        deadline: "2024-12-22",
      },
    ],
  });

  const [rutiner, setRutiner] = useState([
    { id: 1, title: "Träning", Repetitioner: 2, Prioritet: "hög" },
    { id: 3, title: "Plugga", Repetitioner: 5, Prioritet: "mellan" },
    { id: 4, title: "Meditera", Repetitioner: 3, Prioritet: "låg" },
  ]);

  const [events, setEvents] = useState([
    {
      name: "dailystand up",
      start: "2024-12-22T10:59:00.000Z",
      end: "2024-12-31T10:59:00.000Z",
    },
    {
      name: "dailystand up2",
      start: "2024-12-24T10:59:00.000Z",
      end: "2024-12-29T10:59:00.000Z",
    },
  ]);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        tasks,
        setTasks,
        rutiner,
        setRutiner,
        events,
        setEvents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

import React from "react";
import { VillagerReady, VampireReady, DoctorReady } from "./VillagerReady";

function NightView({ user, users, night }) {
  return (
    <div>
      <h2>{night}</h2>
      {user.role === "Köylü" && <VillagerReady user={user} />}
      {user.role === "Doktor" && (
        <DoctorReady
          user={user}
          users={users.filter((x) => x.id !== user.id)}
        />
      )}
      {user.role === "Vampir" && (
        <VampireReady
          user={user}
          users={users.filter((x) => x.id !== user.id)}
        />
      )}
    </div>
  );
}
export default NightView;

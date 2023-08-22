import { useEffect, useState } from "react";
import { Profile } from "@/components/Profile/Profile";
export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && (
      <>
        <div
          style={{
            backgroundColor: "white",
            minHeight: "600px",
            marginTop: 150,
          }}
        >
          <Profile />
        </div>
      </>
    )
  );
}

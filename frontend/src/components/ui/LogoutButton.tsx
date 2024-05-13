import React from "react";
import {Button} from "@/components/ui/button.tsx";

const LogoutButton: React.FC = () => {
  return (
    <Button asChild>
      <a href="/api/logout">Logout</a>
    </Button>
  )
}

export default LogoutButton

import React from "react";

const LogoutButton: React.FC = () => {
  return (
    <a href="/api/logout" className="bg-primary text-primary-foreground hover:bg-primary/90">Logout</a>
  )
}

export default LogoutButton

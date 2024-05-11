import React, {ReactElement} from "react";
import {Router, RouterProvider} from "@tanstack/react-router";
import {useGetProfileQuery} from "@/lib/auth/authApi.ts";

interface Props {
  router: Router<any, any>
}

const AppRouter: React.FC<Props> = ({router}): ReactElement => {
  useGetProfileQuery({})
  return (<RouterProvider router={router}/>)
}

export default AppRouter

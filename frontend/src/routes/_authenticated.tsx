import {createFileRoute, Outlet} from '@tanstack/react-router'
import {useAppSelector} from "@/lib/redux-hooks.ts";
import {selectAuthState} from "@/lib/auth/selectors.ts";
import LoginButton from "@/components/ui/LoginButton.tsx";

export const Route = createFileRoute('/_authenticated')({
  component: () => {
    const {user} = useAppSelector(selectAuthState)
    if (!user) {
      return (<div>Hello please login! <LoginButton/></div>)
    }

    return <Outlet/>
  }
})

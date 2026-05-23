import { ButtonFunc } from '../Common/Buttons'
import { destroySession } from '@/lib/session'

export default function ButtonLogout() {
  return (
    <form action={destroySession}>
      <ButtonFunc text='Logout' type='submit' />
    </form>
  )
}

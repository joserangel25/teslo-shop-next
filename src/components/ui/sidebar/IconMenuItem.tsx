import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5";

interface Props {
  label: string
}

export const IconMenuItem = ({ label }: Props) => {
  switch (label) {
    case 'perfil':
      return (
        <div className="w-7 flex justify-center items-center "> <IoPersonOutline /> </div>
      );
    case 'ordenes':
      return (
        <div className="w-7 flex justify-center items-center "> <IoTicketOutline /> </div>
      );
    case 'ingresar':
      return (
        <div className="w-7 flex justify-center items-center "> <IoLogInOutline /> </div>
      );
    case 'salir':
      return (
        <div className="w-7 flex justify-center items-center "> <IoLogOutOutline /> </div>
      );
    case 'productos':
      return (
        <div className="w-7 flex justify-center items-center "> <IoShirtOutline /> </div>
      );
    case 'usuarios':
      return (
        <div className="w-7 flex justify-center items-center "> <IoPeopleOutline /> </div>
      );
    default:
      <></>
  }
}

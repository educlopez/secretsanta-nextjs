import Image from 'next/image'
import santaProfile from '@/images/santa.png'

const icon = [
  {
    name: 'Perfil Santa',
    img: santaProfile,
  },
]
export function Avatar(props) {
  return (
    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-red-500 bg-gradient-to-r from-[#b43636]/40  to-[#ff7575]/40 transition-colors  duration-300  dark:group-hover:border-rose-300/70">
      <Image src={santaProfile} alt="santa" className="w-full h-full m-0" />
    </div>
  )
}

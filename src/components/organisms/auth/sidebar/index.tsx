import { Link } from '@tanstack/react-router'
import { cn } from '../../../../shared/lib/classnames'

export type SideBarButtonProps = {
  icon: React.ReactNode
  label: string
  isActive: boolean
  link: string
  disableLabel?: boolean
}

function SideBarButton({
  label,
  icon,
  isActive,
  link,
  disableLabel,
}: SideBarButtonProps) {
  return (
    <Link to={link} className="group flex w-fit flex-col items-center gap-2">
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-full border bg-[#fcfcfc] fill-[#80838D] stroke-[#80838D] text-[#80838D] transition-all duration-300 ease-in-out backdrop-blur-sm group-hover:border-white/10 group-hover:bg-[#1C2024] group-hover:fill-white group-hover:stroke-white group-hover:text-white group-hover:shadow-fancy-neutral',
          {
            'border-white/10 bg-[#1C2024] fill-white stroke-white text-white shadow-fancy-neutral':
              isActive,
          }
        )}
      >
        {icon}
      </div>

      {!disableLabel && (
        <p
          className={cn(
            'text-center text-[10px] font-medium text-[#80838D] transition-all duration-300 ease-in-out group-hover:text-white',
            {
              'text-white': isActive,
            }
          )}
        >
          {label}
        </p>
      )}
    </Link>
  )
}

export default function SideBar({
  options,
}: {
  options: SideBarButtonProps[]
}) {
  return (
    <aside className="hidden w-[160px] min-w-[160px] md:block">
      <nav className="flex flex-col items-center gap-6 p-4 pt-6">
        {options.map((option) => (
          <SideBarButton key={option.label} {...option} />
        ))}
      </nav>
    </aside>
  )
}

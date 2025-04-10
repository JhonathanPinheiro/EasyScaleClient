import { Link } from '@tanstack/react-router'
import { cn } from '../../../shared/lib/classnames'

interface BreadcrumbItem {
  icon?: React.ReactNode
  label?: string
  link?: string
}

interface LayoutContainerProps {
  title?: string
  description?: string
  children: React.ReactNode
  breadcrumb?: BreadcrumbItem[]
  buttonChildren?: React.ReactNode
  classNameTitle?: string
  className?: string
}

export default function LayoutContainer({
  title,
  description,
  buttonChildren,
  children,
  breadcrumb,
  className,
  classNameTitle,
}: LayoutContainerProps) {
  return (
    <div
      className={cn(
        'gradient-border-left-main flex flex-col gap-5 rounded-3xl bg-white/30 p-6 pb-14',
        className
      )}
      style={{ width: 'calc(100vw - 200px)' }}
    >
      {breadcrumb?.length && (
        <div className="flex flex-wrap w-full items-center gap-1.5 md:gap-3 stroke-[#60646C]">
          {breadcrumb?.map((item, index) => (
            <>
              <div key={item.label} className="flex items-center gap-2">
                {item?.icon}
                <Link to={item.link}>
                  <span
                    className={cn(
                      'font-inter text-xs font-normal leading-normal text-[#989EA4]',
                      breadcrumb.length - 1 === index &&
                        'font-semibold text-[#697077]'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </div>
              {breadcrumb.length - 1 !== index && (
                <span className="font-inter text-xs font-normal leading-normal text-[#DEE0E2]">
                  {'/'}
                </span>
              )}
            </>
          ))}
        </div>
      )}
      <div className="flex w-full flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-4">
          <p
            className={cn(
              'font-plus-jakarta-sans text-2xl md:text-5xl font-bold text-[#1C2024]',
              classNameTitle
            )}
          >
            {title}
          </p>
          {description && (
            <p className="font-inter text-sm md:text-base font-normal leading-tight text-[#828282]">
              {description}
            </p>
          )}
        </div>

        {buttonChildren}
      </div>
      <div className="h-[1px] w-full bg-[#edefef]" />
      {children}
    </div>
  )
}

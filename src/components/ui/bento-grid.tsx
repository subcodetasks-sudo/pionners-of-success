import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: ReactNode
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: ReactNode
  href: string
  cta: ReactNode
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col overflow-hidden rounded-xl",
      "bg-linear-to-t from-background to-transparent ",
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>

    <div className="relative p-5 pt-3 pb-6">
      {/* content slides up on hover */}
      <div className="flex transform-gpu flex-col gap-1.5 transition-transform duration-300 ease-out group-hover:-translate-y-8">
        <div className="flex items-center justify-center size-10 rounded-full bg-secondary!">
          <Icon className="size-6 origin-center transform-gpu text-white transition-all duration-300 ease-in-out group-hover:scale-75" />
        </div>
        <h3 className="text-lg font-semibold text-[--color-primary]">
          {name}
        </h3>
        <p className="max-w-lg text-sm leading-relaxed text-[--color-primary] opacity-70 line-clamp-2">{description}</p>
      </div>

      {/* button absolutely positioned at the bottom, hidden until hover */}
      <div className="absolute bottom-3  start-5 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          to={href}
          className="inline-flex items-center gap-2 rounded-full bg-secondary! py-2 ps-4 pe-2 text-xs font-semibold text-white transition-all duration-200 hover:brightness-110"
        >
          {cta}
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white">
            <ArrowRightIcon className="h-3 w-3 rtl:-rotate-135 ltr:-rotate-45 text-secondary!" />
          </span>
        </Link>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[0.03] group-hover:dark:bg-neutral-800/10" />
  </div>
)

export { BentoCard, BentoGrid }

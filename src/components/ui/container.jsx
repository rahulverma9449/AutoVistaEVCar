import { cn } from "@/lib/utils";
function Container({
  className,
  wide = false,
  children,
  ...props
}) {
  return <div
    className={cn(
      "container mx-auto px-4",
      wide ? "max-w-screen-2xl" : "max-w-screen-xl",
      className
    )}
    {...props}
  >{children}</div>;
}
export {
  Container
};

export default function Button({ children, href, variant = "primary", size = "m", Icon, iconDirection="left", ...props }) {

    // Variants: Primary, Secondary, Tertiary
    // Sizes: S, M, L
    // Icons: Start, End

    // Default
    let classes = "cursor-pointer rounded-full font-medium	 flex gap-2 justify-items-center items-center transition-colors border-2"

    // Size
    let sizeClasses;
    let iconClasses;
    switch (size) {
        case 's':
            sizeClasses = ' px-4 py-1 text-sm';
            iconClasses += ' size-3'
            break;
        case 'm':
            sizeClasses = ' px-5 py-2 text-base';
            iconClasses += ' size-5'
            break;
        case 'l':
            sizeClasses = ' px-6 py-2 text-lg';
            iconClasses += ' size-5'
            break;

    }

    classes += sizeClasses;

    // Variant
    let variantClasses = '';

    switch (variant) {
        case 'primary':
            variantClasses = ' bg-cherry-950 border-transparent  text-cherry-300 hover:bg-cherry-900 hover:text-cherry-100';
            iconClasses += ' text-cherry-500';
            break;
        case 'secondary':
            variantClasses = ' bg-transparent border-solid border-2 border-cherry-900 text-cherry-900 hover:bg-cherry-900 hover:text-cherry-100';
            iconClasses += ' text-cherry-600';
            break;
        case 'tertiary':
            variantClasses = ' bg-transparent border-transparent text-cherry-900 hover:bg-cherry-900/10 hover:text-cherry-950';
            iconClasses += ' text-cherry-600';
            break;
        case 'text':
            variantClasses = ' bg-transparent border-transparent text-cherry-900 hover:text-cherry-600';
            iconClasses += ' text-cherry-600';
            break;

    }

    classes += variantClasses;


    // Icon
  
    if (iconDirection === "right") {
        classes += ' flex-row-reverse'
    }
  
    // Element
    const Element = href ? 'a' : 'button';
    const elementProps = href ? { ...props, href } : { ...props, type: 'button' };

    return (
        <Element className={classes} {...elementProps}>
            {Icon && <Icon className={iconClasses} />}
            {children}
        </Element>
    );
}
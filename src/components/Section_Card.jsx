import Link from 'next/link'
import { motion } from 'framer-motion'

import { Styled_Button, SectionImage } from '@components'
import { sectionContentVariants as variants } from '@motion'

const Section_Card = ({ id, idx, INITIAL, ANIM, EXIT, yDir, isMd, data }) => {
    const even = idx % 2 == 0

    // Section name from slug for Link "as"
    const pathAs = data.slug.charAt(0).toUpperCase() + data.slug.slice(1)

    // Title Decoration
    const Title_Decoration = (
        <motion.span
            className="section-title-underline"
            style={{
                originX: isMd ? (even ? 0.85 : 0.15) : 0.5,
                right: isMd & even ? 0 : 'auto',
                left: isMd & even ? 'auto' : 0,
            }}
            variants={variants.Decoration}
        />
    )
    // Props
    const motionProps = { initial: INITIAL, animate: ANIM, exit: EXIT }
    const itemProps = {
        variants: isMd ? variants.Items_X : variants.Items_Y,
        custom: isMd ? (even ? -1 : 1) : yDir,
    }
    const sectionImgProps = {
        src: data.src,
        alt: data.alt,
        id: `image-${id}`,
        ...motionProps,
    }

    return (
        <div id={`${id}-content`} className="full relative md:flex">
            {isMd ? (
                <SectionImage
                    style={{ order: even ? 2 : 1, userSelect: 'none' }}
                    variants={variants.ImgMd}
                    custom={even ? 1 : -1}
                    {...sectionImgProps}
                />
            ) : null}

            <motion.div
                id={`content-${id}`}
                data-animation={ANIM}
                className={`full flex-col-btw relative whitespace-pre-line p-8 text-center sm:px-20 sm:py-32 md:justify-center md:space-y-10 md:p-0 landscape:justify-center landscape:py-0  ${
                    even
                        ? 'order-1 md:items-end md:text-end'
                        : 'order-2 md:items-start md:text-start'
                }`}
                variants={variants.Container}
                {...motionProps}
            >
                <motion.h3 className="relative sm:w-[75%] md:w-full md:px-4">
                    {data.sectionName}
                    {Title_Decoration}
                </motion.h3>

                <motion.div
                    className="my-8 w-full rounded-3xl bg-white/10 px-4 py-[10vh] backdrop-blur-sm md:w-[92.5%] md:bg-grey/10 md:py-10 landscape:my-2 landscape:py-2 md:landscape:my-0 md:landscape:py-10"
                    {...itemProps}
                >
                    <p className="text-xl font-medium leading-7 sm:text-2xl md:text-xl lg:text-[1.35em]">
                        {data.subtitle.replace('<br/>', `\n`)}
                    </p>
                </motion.div>

                {!isMd ? <SectionImage {...sectionImgProps} /> : null}

                <motion.div
                    className="relative md:mx-10"
                    variants={variants.Btn}
                >
                    <Styled_Button even={even}>
                        <Link
                            href={{
                                pathname: '/section/[slug]',
                                query: { slug: data.slug },
                            }}
                            as={'/' + pathAs}
                            scroll={false}
                        >
                            Read More
                        </Link>
                    </Styled_Button>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Section_Card

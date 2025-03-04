import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { useMediaQuery } from '@hooks'
import { pushPage } from '@utils'
import { Styled } from '@components'
import Burger from './Burger'
import Menu from './Menu'

const LOGO = ({ centered }) => (
    <motion.a
        id="logo"
        className="flex-center relative z-10 min-w-max cursor-pointer select-none overflow-hidden whitespace-nowrap text-center text-28pt font-thin tracking-2xl text-white/40 transition-colors duration-500 ease-tween after:content-['JYN'] hover:text-white/80"
        initial={false}
        animate={{
            x: centered ? 'calc(50vw - 50% - 16px)' : '0px',
        }}
        transition={{ duration: 1, ease: 'anticipate' }}
        onClick={() => {
            if (window.scrollY == 0 || typeof window == undefined) {
                router.reload()
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }}
    >
        JYN
    </motion.a>
)

const NavLinks = ({}) => (
    <motion.ul
        className="flex-center absolute right-0 top-0 z-10 h-full"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={{
            hidden: { transition: { staggerChildren: 0.05 } },
            show: {
                transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
        }}
    >
        <Styled.SectionLinks
            className="flex-center relative mx-4 h-3/4 bg-clip-text text-[0.9em] leading-none transition-colors delay-100 duration-250 ease-in hover:text-white"
            variants={{ hidden: { y: -50 }, show: { y: 0 } }}
            transition={{ duration: 0.5 }}
        />
    </motion.ul>
)

const Navbar = ({ isHome }) => {
    const isLg = useMediaQuery(1024)
    const [menuOpen, setMenu] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    const toggleMenu = () => {
        setMenu(!menuOpen)
        const overflowStyle = menuOpen ? 'auto' : 'hidden'
        document.querySelector('body').style.overflow = overflowStyle
    }

    useEffect(() => {
        if (isLg & menuOpen || !isHome & menuOpen) setMenu(false)
    }, [isLg, isHome, menuOpen])

    return (
        <>
            <motion.nav
                id="navbar"
                className="tempered-bg fixed top-0 left-0 z-[99] flex h-14 w-screen items-center px-4"
                data-menuopen={menuOpen}
                initial={{ y: -56, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
                onAnimationComplete={() => setIsMounted(true)}
            >
                <LOGO centered={!isLg || !isHome} />
                <AnimatePresence mode="wait">
                    {isLg ? (
                        isHome && isMounted && <NavLinks key="nav-links" />
                    ) : (
                        <Burger
                            key="nav-burger"
                            ANIM={
                                !isHome
                                    ? 'return'
                                    : menuOpen
                                    ? 'opened'
                                    : 'closed'
                            }
                            handleBurger={() =>
                                isHome ? toggleMenu() : pushPage('/')
                            }
                        />
                    )}
                </AnimatePresence>
            </motion.nav>
            <AnimatePresence>
                {isLg && !isHome && (
                    <Styled.BackButton
                        key="nav-back-btn"
                        onClick={() => pushPage('/')}
                    />
                )}
                {menuOpen && <Menu key="nav-menu" toggleMenu={toggleMenu} />}
            </AnimatePresence>
        </>
    )
}

export default Navbar

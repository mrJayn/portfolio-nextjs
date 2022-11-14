import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import Card_Base from './Card_Base'
import Tabs from '../__sections/_experience/Tabs'

import { useGlobalControls, useMediaQuery } from '@hooks'

const Card_Group = ({ tabs, globalControls, ...data }) => {
    const isMd = useMediaQuery(768)
    const [expanded, setExpanded] = useState(false)
    const [[currentTab, direction], setTab] = useState([0, 0])

    const cardData = data.data
    const isAbout = cardData.section == 'About'

    const cardProps = {
        data: cardData,
        isAbout: isAbout,
        expanded: expanded,
        setExpanded: setExpanded,
        isMd: isMd,
    }
    const card_expanded_props = {
        cardData: cardData,
        tabs: tabs,
        isAbout: isAbout,
        currentTab: currentTab,
        direction: direction,
        setTab: setTab,
        expanded: expanded,
        setExpanded: setExpanded,
        isMd: isMd,
    }

    // useGlobalControls for dynamic NAV (@media<768px)
    useGlobalControls(globalControls, [expanded, setExpanded], ['card', isMd])

    return (
        <>
            <Card_Base {...cardProps} />
            {/**************************************/}
            <AnimatePresence onExitComplete={() => setTab([0, 0])}>
                {expanded && <Tabs {...card_expanded_props} />}
            </AnimatePresence>
        </>
    )
}
export default Card_Group

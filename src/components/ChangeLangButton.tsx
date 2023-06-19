
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons"

import { useTranslation } from 'react-i18next'

function ChangeLangButton() {
    const [_, i18n] = useTranslation()

    return (
        <Menu>
            <MenuButton
                as={Button}
                color="white"
                fontSize="lg"
                rightIcon={<ChevronDownIcon />}
                bgColor="transparent"
                _hover={{bgColor: "whiteAlpha.100"}}
                _focus={{bgColor: "whiteAlpha.100"}}
                _expanded={{bgColor: "whiteAlpha.100"}}
            >
                Language
            </MenuButton>
            <MenuList
                bgColor="gray.100"
                px="4px"
                display="flex"
                flexFlow="column"
                rowGap="4px"
            >
                <MenuItem
                    onClick={() => i18n.changeLanguage("en")}
                    bgColor="transparent"
                    _hover={{bgColor: "blackAlpha.100"}}
                    transition="all"
                    transitionDuration="300ms"
                    rounded="lg"
                    py="6px"
                    px="12px"
                    color="blackAlpha.800"
                >
                    English
                </MenuItem>
                <MenuItem
                    onClick={() => i18n.changeLanguage("fa")}
                    bgColor="transparent"
                    _hover={{bgColor: "blackAlpha.100"}}
                    transition="all"
                    transitionDuration="300ms"
                    rounded="lg"
                    py="6px"
                    px="12px"
                    color="blackAlpha.800"
                >
                    Persian
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default ChangeLangButton
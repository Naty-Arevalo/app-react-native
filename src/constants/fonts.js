import * as Font from 'expo-font'

export const loadFonts = async()=>{
    await Font.loadAsync({
        'josefinaSans': require('../../assets/fonts/JosefinSans-Italic-VariableFont_wght.ttf'),
        'gentiumPlus': require("../../assets/fonts/GentiumPlus-Italic.ttf"),
        'mysteryQuest': require('../../assets/fonts/MysteryQuest-Regular.ttf')

    })
}
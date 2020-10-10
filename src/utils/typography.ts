import Typography from 'typography'
import noriegaTheme from 'typography-theme-noriega'
noriegaTheme.overrideThemeStyles = ({ rhythm }, options) => ({
    'a' : {
        fontFamily: ["Lato", "sans-serif"].join(',')
    }
})

const typography = new Typography(noriegaTheme)

// Export helper functions
export default typography
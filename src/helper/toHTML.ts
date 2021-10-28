import {remark} from "remark"
import remarkHTML from "remark-html"

const toHTML = (value: string): string =>
remark().use(remarkHTML).processSync(value).toString()

export default toHTML
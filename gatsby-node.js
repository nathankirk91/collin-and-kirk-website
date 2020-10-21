const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const eyeConditionTemplate = path.resolve(`src/templates/eye-condition.tsx`)
  return graphql(`
    query EyeConditionsPages {
      allContentfulEyeCondition {
        nodes {
          slug
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    result.data.allContentfulEyeCondition.nodes.forEach(node => {
      createPage({
        path: `eye-conditions/${node.slug}`,
        component: eyeConditionTemplate,
        context: {
          slug: node.slug,
        },
      })
    })
  })
}

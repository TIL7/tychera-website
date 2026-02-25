export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-05'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    console.error(`Error: ${errorMessage}`)
    console.error('Info: Please create a .env.local file with the following variables:')
    console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id')
    console.error('   NEXT_PUBLIC_SANITY_DATASET=production')
    console.error('   NEXT_PUBLIC_SANITY_API_VERSION=2026-02-05')
    console.error('   NEXT_PUBLIC_SITE_URL=http://localhost:3000')
    throw new Error(errorMessage)
  }

  return v
}

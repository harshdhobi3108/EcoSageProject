import { Suspense } from "react"
import SearchClient from "./SearchClient"

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted-foreground">Loading search results...</div>}>
      <SearchClient />
    </Suspense>
  )
}

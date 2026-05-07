import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";

export const experimental_ppr = true;
export const dynamic = 'force-dynamic';

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetails slug={slug} />
      </Suspense>
    </main>
  )
}

export async function generateStaticParams() {
  return [];
}



export default EventDetailsPage;
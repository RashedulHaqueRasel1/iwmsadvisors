import { getRealEstate, getSingleRealEstate } from '@/lib/api/api'
import { slugify } from '@/lib/utils'
import { RealEstate } from '@/lib/type/realEstate'
import RealStateHero from './RealStateHero'
import RealStateOverAllView from './RealStateOverAllView'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const RealStateMain = async ({ id }: { id: string }) => {
    let data = null;
    try {
        const allRealEstate = await getRealEstate();
        const matchedItem = allRealEstate?.data?.find((item: RealEstate) =>
            slugify(item.title) === id || item._id === id
        );

        if (matchedItem) {
            const response = await getSingleRealEstate(matchedItem._id);
            data = response?.data;
        }
    } catch (error) {
        console.error("Error fetching real estate:", error);
    }

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Item Not Found</h2>
                <p className="text-gray-600 mb-8">The requested item could not be found or there was an error fetching the data.</p>
                <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="-mt-12 md:-mt-20 bg-gray-50 pb-12 md:pb-20">
            <div className="container mx-auto px-4 pt-8">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-8 group"
                >
                    <div className="p-2 rounded-full bg-white shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Back to Home</span>
                </Link>
            </div>

            <RealStateHero
                image={data.image?.url || ""}
                title={data.title || ""}
                description={data.overview || ""}
                subtitles={data.subtitles}
            />
            <div className="container mx-auto px-4 py-12">
                <RealStateOverAllView
                    overview={data.overview}
                    keyCapabilities={data.keyCapabilities}
                />
            </div>
        </div>
    )
}

export default RealStateMain
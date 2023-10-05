import Layout from '../../components/layout'


export default function About() {

  return (
    <Layout>
    <div className="bg-white">

      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
          <div
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-stone-900 sm:text-6xl lg:col-span-2 xl:col-auto">Clockwork and Clay</h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <h2 className="mb-8 text-stone-700 text-3xl"> An exploration of the integration of Generative AI and Art</h2>
                <p className="text-lg leading-8 text-gray-600 mb-8">Clockwork and Clay comes from the Greek myths of the origin of humans - formed of clay by the titan Prometheus. The ancient Greeks also had myths of automata such as Talos, created by Hephaestus. Granted, they never talked about clockwork ... But if the cost of a great alliteration is a little mythological inaccuracy I'm happy to pay it.</p>
                <p className="text-lg leading-8 text-gray-600 mb-8">There's no doubt in my mind that genAI can be used to cheapen art and culture - to further comodify the soul. Clockwork and Clay, among other things, is my attempt to integrate GenerativeAI into my art work. To augment my work and give readers a personalized experience instead of churning out simulacra.</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                alt=""
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
              />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>

      </main>

    </div>
    </Layout>
  )
}

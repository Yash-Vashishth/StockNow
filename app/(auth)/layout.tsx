import Image from "next/image"
import Link from "next/link"
import photo from "../../public/public/assets/icons/logo.svg"
import staricon from "../../public/public/assets/icons/star.svg"
import dashboardphoto from "../../public/public/assets/images/dashboard.png"

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="auth-layout">
        <section className="auth-left-section scrollbar-hide-default">
            <Link href="/" className="auth-logo">
                <Image src={photo} alt="StockNow Logo" height={32} width={140} className="h-8 auto" />
            </Link>
            
            <div className="pb-6 lg:pb-8 flex-1">{children}</div>
        </section>
        
        <section className="auth-right-section">
            <div className="z-10 relative lg:mt-4 lg:mb-16">
                <blockquote className="auth-blockquote">
                    StockNow turned my watchlist to something that I would be my go-to opener when searching and comparing stocks. Might be good, Might be wrong, let me check StockNow !
                </blockquote>                
                
                <div className="flex items-center justify-between">
                    <div>
                        <cite className="auth-testimonial-author">-Raghav Chandra</cite>
                        <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                    </div>
                    
                    <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Image
                                key={star}
                                src={staricon}
                                alt="Star"
                                width={20}
                                height={20}
                                className="w-5 h-5"
                            />
                        ))}
                    </div>
                </div>                
            </div>
            
            <div className="flex-1 relative">
                <Image
                    src={dashboardphoto}
                    alt="Dashboard preview"
                    width={1440}
                    height={1150}
                    className="auth-dasboard-preview absolute top-0"
                />
            </div>
        </section>
    </main>
  )
}

export default Layout
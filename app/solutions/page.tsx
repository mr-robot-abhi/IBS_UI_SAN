import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, ArrowRight, Layers, RefreshCw, TrendingUp, Shield } from 'lucide-react';

export default function SolutionsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5833751/pexels-photo-5833751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Technology Solutions</h1>
            <p className="text-xl text-blue-100 mb-8">
              Comprehensive, integrated solutions designed to optimize your financial operations and drive business growth.
            </p>
            <Button variant="primary" size="lg" className="bg-white text-[#005b99] hover:bg-gray-100">
              <Link href="#treasury">
                Explore Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Treasury Solutions */}
      <section id="treasury" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-[#005b99] rounded-full text-sm font-medium mb-4">
                  Treasury Solutions
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Treasury Management System</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Our comprehensive treasury management solution gives you complete visibility and control over your cash positions, investments, and risk exposure.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Cash Management</h3>
                    <p className="text-gray-600">Real-time visibility into global cash positions and forecasting to optimize liquidity.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Bank Connectivity</h3>
                    <p className="text-gray-600">Secure, automated connections to your banking partners for streamlined operations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Financial Risk Management</h3>
                    <p className="text-gray-600">Tools to identify, assess, and mitigate foreign exchange, interest rate, and commodity risks.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Investment Portfolio Management</h3>
                    <p className="text-gray-600">Manage and optimize your investment portfolio with detailed analytics and reporting.</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" asChild>
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Treasury Management Dashboard" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Banking Solutions */}
      <section id="banking" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-[#005b99] rounded-full text-sm font-medium mb-4">
                  Banking Solutions
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Banking Integration Platform</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Seamlessly connect with your banking partners and automate reconciliation processes for more efficient financial operations.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Multi-bank Connectivity</h3>
                    <p className="text-gray-600">Connect to multiple banks through a single, secure platform using industry-standard protocols.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Account Statement Reconciliation</h3>
                    <p className="text-gray-600">Automate the reconciliation of bank statements with your ERP or accounting system.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Payment Factory</h3>
                    <p className="text-gray-600">Centralize and standardize payment processes across your organization for better control and efficiency.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Fraud Prevention</h3>
                    <p className="text-gray-600">Advanced security features to protect against payment fraud and unauthorized access.</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" asChild>
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/5849592/pexels-photo-5849592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Banking Integration Platform" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Payment Solutions */}
      <section id="payments" className="py-20 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-[#005b99] rounded-full text-sm font-medium mb-4">
                  Payment Solutions
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Processing Platform</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Streamline payment processing with our secure, compliant, and efficient platform that supports multiple payment methods and currencies.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Global Payment Processing</h3>
                    <p className="text-gray-600">Process payments in multiple currencies with competitive FX rates and low fees.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Automated Payment Workflows</h3>
                    <p className="text-gray-600">Configure approval workflows and payment rules to ensure compliance and control.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Regulatory Compliance</h3>
                    <p className="text-gray-600">Stay compliant with global payment regulations and standards, including SWIFT, SEPA, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Real-time Tracking</h3>
                    <p className="text-gray-600">Monitor payment status in real-time with detailed reporting and analytics.</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" asChild>
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Payment Processing Platform" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Risk Management */}
      <section id="risk" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-[#005b99] rounded-full text-sm font-medium mb-4">
                  Risk Management
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Risk Management</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Identify, assess, and mitigate financial risks with our advanced analytics and reporting tools to protect your organization.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Market Risk Analysis</h3>
                    <p className="text-gray-600">Monitor and analyze exposure to market risk factors such as interest rates, FX rates, and commodity prices.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Credit Risk Management</h3>
                    <p className="text-gray-600">Assess and manage counterparty credit risk to minimize potential losses.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Risk Reporting</h3>
                    <p className="text-gray-600">Generate comprehensive risk reports for management, auditors, and regulators.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Hedging Strategies</h3>
                    <p className="text-gray-600">Develop and implement effective hedging strategies to mitigate financial risks.</p>
                  </div>
                </div>
              </div>

              <Button variant="primary" asChild>
                <Link href="/contact">
                  Request a Demo
                </Link>
              </Button>
            </div>
            
            <div className="lg:w-1/2">
              <img 
                src="https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Risk Management Dashboard" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose IBS Fintech</h2>
            <p className="text-lg text-gray-600">
              Our solutions are designed with your business needs in mind, offering a range of features and benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <Layers className="h-12 w-12 text-[#005b99] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrated Platform</h3>
              <p className="text-gray-600">
                A single, integrated platform for all your financial operations, eliminating silos and improving efficiency.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <RefreshCw className="h-12 w-12 text-[#005b99] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Access real-time data and insights to make informed decisions and respond quickly to market changes.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <TrendingUp className="h-12 w-12 text-[#005b99] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Scalable Solutions</h3>
              <p className="text-gray-600">
                Our solutions grow with your business, accommodating increased volume and complexity as you expand.
              </p>
            </div>
            
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
              <Shield className="h-12 w-12 text-[#005b99] mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                Bank-grade security measures to protect your financial data and transactions from threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Financial Operations?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact us today to learn how our solutions can help your organization achieve financial excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button variant="primary" size="lg" className="bg-white text-[#005b99] hover:bg-gray-100" asChild>
              <Link href="/contact">
                Request a Demo
              </Link>
            </Button>
            <Button variant="outline_primary" size="lg" className="border-white text-white hover:bg-white hover:text-[#005b99]" asChild>
              <Link href="/case-studies">
                View Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
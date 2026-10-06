import { createClient } from "@/utils/supabase/server";
import ProductManager from "@/components/ProductManager";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  // Fetch products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="max-w-7xl mx-auto p-8 flex flex-col gap-12">
      
      {/* Header */}
      <header>
        <h1 className="font-serif text-4xl text-node-purple mb-2">Welcome Back.</h1>
        <p className="font-sans text-node-gray">Here is an overview of your Node cafe operations.</p>
      </header>

      {/* Orders Section */}
      <section>
        <h2 className="font-sans text-xl font-bold uppercase tracking-widest text-node-purple mb-6">Recent Orders</h2>
        
        <div className="bg-white border border-node-gray/20 rounded-xl overflow-hidden shadow-sm">
          {(!orders || orders.length === 0) ? (
            <div className="p-8 text-center text-node-gray/60 font-sans italic">No orders yet.</div>
          ) : (
            <table className="w-full text-left font-sans text-sm">
              <thead className="bg-node-light text-node-gray uppercase tracking-wider text-xs border-b border-node-gray/10">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Branch</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-node-gray/10">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-node-light transition-colors">
                    <td className="p-4 font-mono text-xs text-node-gray/60">{order.id.split('-')[0]}...</td>
                    <td className="p-4 font-bold text-node-dark">{order.order_type || 'N/A'}</td>
                    <td className="p-4 text-node-dark">{order.branch || 'N/A'}</td>
                    <td className="p-4 text-node-purple font-bold">Rs. {order.total_amount || order.total}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-node-purple/10 text-node-purple rounded text-xs uppercase tracking-widest font-bold">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-node-gray">{new Date(order.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <ProductManager initialProducts={products || []} />
      </section>
      
    </div>
  );
}

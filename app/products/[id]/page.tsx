//cara bikin dynamic route di next.js
export default async function ProductsPage({ params,

}:   {
    params: Promise<{ id: string }>;
}){     
    //cara 1
    //const id = (await params).id;
    //cara 2  
    const {id} = await params;
    console.log(id);    

  return (
    <div>
      <h1>Products Page</h1>
      <p>This page lists all the products available in the application.</p>
    </div>
  );
}
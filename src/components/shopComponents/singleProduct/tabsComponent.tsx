import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabsComponent: React.FC = ({ productInfo }) => {
  return (
    <div id="tabs_container" className="mt-10">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="infos">Additional Information</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          {productInfo.short_description !== null
            ? productInfo.short_description
            : "A description for this item is currently unavailable."}
        </TabsContent>

        <TabsContent value="infos">
          <div id="infos_container" className="flex gap-2 flex-col">
            <div id="item" className="flex items-center justify-between">
              <h4>Model</h4>
              <p className="text-gray-500 text-sm">{productInfo.model}</p>
            </div>
            <hr />
            <div id="item" className="flex items-center justify-between">
              <h4>Release Date</h4>
              <p className="text-gray-500 text-sm">
                {new Date(productInfo.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <hr />
            <div id="item" className="flex items-center justify-between">
              <h4>Weekly Orders</h4>
              <p className="text-gray-500 text-sm">
                {productInfo.weekly_orders}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews">No reviews yet.</TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsComponent;

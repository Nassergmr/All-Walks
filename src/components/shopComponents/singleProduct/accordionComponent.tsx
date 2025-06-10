import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionComponent: React.FC = () => {
  return (
    <div>
      <div id="accordion_container" className=" ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="justify-between">
              <div className="flex gap-2 items-center">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>
                </p>
                <p>Worry Free Purshasing</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              This item is verified by AllWalks or Xpress ships directly from a
              AllWalks Verified Seller. Items verified by AllWalks are shipped
              from Sellers to our Verification Centers, where our global team of
              experts uses a rigorous, multi-step verification process. Items
              from AllWalks Verified Sellers are shipped directly from the
              Seller to you. Sellers in this program must meet AllWalks&apos;s
              rigorous standards for accuracy, legitimacy and speed. And if a
              mistake is made, AllWalks will make it right through theAllWalks
              Buyer Promise.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="justify-between">
              <div className="flex gap-2 items-center">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </p>
                <p>Buyer Promise</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              Don’t love it? Resell your purchase without any fees within 90
              days of delivery.No Fee Resale
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="justify-between">
              <div className="flex gap-2 items-center">
                <p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                </p>
                <p>Our Process</p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              We stand behind every product sold on AllWalks. If we make a
              mistake, we’ll make it right.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default AccordionComponent;

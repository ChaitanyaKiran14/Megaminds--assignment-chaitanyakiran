import { v4 as uuidv4 } from 'uuid';

export const Services = (props) => {
  const serviceData = [
    {
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
  ];

  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Take your business to the next level</p>
        </div>
        <div className="row">
          {serviceData.map((data) => (
            <div key={uuidv4()} className="col-md-4">
              <div className="service-desc">
                <h3>{data.name}</h3>
                <p>{data.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

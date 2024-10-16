import { DataSource } from 'typeorm';
import { Offer } from '../offers/offer.entity';

export class OfferSeed {
  public async run(dataSource: DataSource): Promise<any> {
    const offerRepository = dataSource.getRepository(Offer);

    const offers = [
      { name: 'Offer A', price: 10.0 },
      { name: 'Offer B', price: 20.0 },
      { name: 'Offer C', price: 30.0 },
    ];

    for (const offerData of offers) {
      const offer = offerRepository.create(offerData);
      await offerRepository.save(offer);
    }
  }
}

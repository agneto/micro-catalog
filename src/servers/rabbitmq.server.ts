import {Context} from '@loopback/context';
import {Server} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Channel, connect, Connection, Replies} from 'amqplib';
import {CategoryRepository} from '../repositories';
import AssertQueue = Replies.AssertQueue;
import AssertExchange = Replies.AssertExchange;

export class RabbitmqServer extends Context implements Server {
  private _listening: boolean;
  conn: Connection;


  constructor(@repository(CategoryRepository) private categoryRepository: CategoryRepository) {
    super();
    console.log('categoryRepository !>>>> ' + categoryRepository);
  }

  async start(): Promise<void> {
    this.conn = await connect({
      hostname: 'rabbitmq',
      username: 'admin',
      password: 'admin'
    });
    this._listening = true;
    this.boot();
  }

  async boot() {
    const channel: Channel = await this.conn.createChannel();
    const queue: AssertQueue = await channel.assertQueue('micro-catalog/sync-videos');
    const exchange: AssertExchange = await channel.assertExchange('amq.topic', 'topic');

    await channel.bindQueue(queue.queue, exchange.exchange, 'model.*.*');

    // const result = channel.sendToQueue('first-queue', Buffer.from('hello world'));
    channel.publish('amq.direct', 'minha-routing-key', Buffer.from('publicado por routing key'));

    channel.consume(queue.queue, (message) => {
      if (!message) {
        return;
      }
      console.log(JSON.parse(message.content.toString()));
      const [model, event] = message.fields.routingKey.split('.').slice(1);
      console.log(model, event);
    });
    // console.log(result);
  }

  async stop(): Promise<void> {
    await this.conn.close();
    this._listening = false;
    return undefined;
  }

  get listening(): boolean {
    return this._listening;
  }

}

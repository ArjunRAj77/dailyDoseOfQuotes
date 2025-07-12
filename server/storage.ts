import {
  users,
  quotes,
  type User,
  type InsertUser,
  type Quote,
  type InsertQuote,
} from "@shared/schema";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllQuotes(): Promise<Quote[]>;
  getQuotesByCategory(category: string): Promise<Quote[]>;
  getRandomQuote(): Promise<Quote | undefined>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private currentUserId: number;
  private currentQuoteId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
    
    // Initialize with quotes from JSON file
    this.initializeQuotes();
  }

  private initializeQuotes() {
    try {
      const quotesPath = path.join(__dirname, 'data', 'quotes.json');
      const quotesData = fs.readFileSync(quotesPath, 'utf-8');
      const initialQuotes: Omit<Quote, 'id'>[] = JSON.parse(quotesData);

      initialQuotes.forEach((quote) => {
        const id = this.currentQuoteId++;
        this.quotes.set(id, { ...quote, id });
      });
      
      console.log(`Loaded ${initialQuotes.length} quotes from JSON file`);
    } catch (error) {
      console.error('Failed to load quotes from JSON file:', error);
      console.log('Continuing with empty quotes collection');
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuotesByCategory(category: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(
      (quote) => quote.category.toLowerCase() === category.toLowerCase(),
    );
  }

  async getRandomQuote(): Promise<Quote | undefined> {
    const allQuotes = Array.from(this.quotes.values());
    if (allQuotes.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    return allQuotes[randomIndex];
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
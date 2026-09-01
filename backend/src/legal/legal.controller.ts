import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { join } from 'node:path';
import { UsersService } from '../users/users.service';
import { PublicDeleteAccountDto } from './dto/public-delete-account.dto';
import { legalPageScript } from './legal-page.script';
import { legalPageStyles } from './legal-page.styles';
import { LegalPagesService } from './legal-pages.service';

const pageSecurityHeaders = {
  'Content-Security-Policy':
    "default-src 'none'; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
};

@Controller()
export class LegalPagesController {
  constructor(private readonly legalPagesService: LegalPagesService) {}

  @Get('privacy')
  privacy(@Res() response: Response) {
    return this.sendHtml(
      response,
      this.legalPagesService.privacyPolicy(),
      true,
    );
  }

  @Get('delete-account')
  accountDeletion(@Res() response: Response) {
    return this.sendHtml(response, this.legalPagesService.accountDeletion());
  }

  @Get('legal.css')
  styles(@Res() response: Response) {
    response.set(pageSecurityHeaders);
    response.set('Cache-Control', 'public, max-age=3600');
    return response.type('text/css').send(legalPageStyles);
  }

  @Get('legal.js')
  script(@Res() response: Response) {
    response.set(pageSecurityHeaders);
    response.set('Cache-Control', 'public, max-age=3600');
    return response.type('text/javascript').send(legalPageScript);
  }

  @Get('legal-fonts/:fileName')
  font(@Param('fileName') fileName: string, @Res() response: Response) {
    const allowedFiles = new Set([
      'BricolageGrotesque-Variable.ttf',
      'IBMPlexSans-Variable.ttf',
    ]);
    if (!allowedFiles.has(fileName)) {
      throw new NotFoundException('Font asset not found');
    }

    response.set({
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Cross-Origin-Resource-Policy': 'same-origin',
      'X-Content-Type-Options': 'nosniff',
    });
    return response
      .type('font/ttf')
      .sendFile(join(__dirname, 'assets', 'fonts', fileName));
  }

  private sendHtml(response: Response, html: string, cache = false) {
    response.set(pageSecurityHeaders);
    response.set(
      'Cache-Control',
      cache ? 'public, max-age=3600' : 'no-store, max-age=0',
    );
    return response.type('html').send(html);
  }
}

@Controller('account-deletion')
export class PublicAccountDeletionController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @Header('Cache-Control', 'no-store, max-age=0')
  @Header('Referrer-Policy', 'no-referrer')
  deleteAccount(@Body() dto: PublicDeleteAccountDto) {
    return this.usersService.deleteByCredentials(dto.email, dto.password);
  }
}

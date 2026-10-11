<?php

namespace TrustPort\Identity;

class TrustPortException extends \RuntimeException
{
    public function __construct(string $message, public readonly string $errorCode = 'trustport_error')
    {
        parent::__construct($message);
    }
}

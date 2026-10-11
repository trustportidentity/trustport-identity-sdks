class TrustPortError(Exception):
    def __init__(self, message: str, code: str = "trustport_error"):
        super().__init__(message)
        self.code = code
